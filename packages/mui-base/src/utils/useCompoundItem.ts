import * as React from 'react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { CompoundComponentContext, CompoundComponentContextValue } from './useCompound';

export interface UseCompoundItemReturnValue<Key> {
  /**
   * The unique key for the child component.
   * If the id was provided to `useCompoundItem`, this will be the same value.
   * Otherwise, this will be a value generated by the `missingKeyGenerator`.
   */
  id: Key | undefined;
  /**
   * The 0-based index of the child component in the parent component's list of registered children.
   */
  index: number;
  /**
   * The total number of child components registered with the parent component.
   * This value will be correct after the effect phase of the component (as children are registered with the parent during the effect phase).
   */
  totalItemCount: number;
}

/**
 * Registers a child component with the parent component.
 *
 * @param id A unique key for the child component. If the `id` is `undefined`, the registration logic will not run (this can sometimes be the case during SSR).
 * @param itemMetadata Arbitrary metadata to pass to the parent component. This should be a stable reference (e.g. a memoized object), to avoid unnecessary re-registrations.
 * @param missingKeyGenerator A function that generates a unique id for the item.
 *   It is called with the set of the ids of all the items that have already been registered.
 *   Return `existingKeys.size` if you want to use the index of the new item as the id.
 *
 * @ignore - internal hook.
 */
export function useCompoundItem<Key, Subitem extends { ref: React.RefObject<Node> }>(
  id: Key | undefined,
  itemMetadata: Subitem,
  missingKeyGenerator: (existingKeys: Set<Key>) => Key,
): UseCompoundItemReturnValue<Key>;
export function useCompoundItem<Key, Subitem>(
  id: Key,
  itemMetadata: Subitem,
): UseCompoundItemReturnValue<Key>;
export function useCompoundItem<Key, Subitem>(
  id: Key | undefined,
  itemMetadata: Subitem,
  missingKeyGenerator?: (existingKeys: Set<Key>) => Key,
): UseCompoundItemReturnValue<Key> {
  const context = React.useContext(CompoundComponentContext) as CompoundComponentContextValue<
    Key,
    Subitem
  >;

  if (context === null) {
    throw new Error('useCompoundItem must be used within a useCompoundParent');
  }

  const { registerItem } = context;
  const [registeredId, setRegisteredId] = React.useState(id);

  useEnhancedEffect(() => {
    const { id: returnedId, deregister } = registerItem(id, itemMetadata, missingKeyGenerator);
    setRegisteredId(returnedId);
    return deregister;
  }, [registerItem, itemMetadata, missingKeyGenerator, id]);

  return {
    id: registeredId,
    index: registeredId !== undefined ? context.getItemIndex(registeredId) : -1,
    totalItemCount: context.totalSubitemCount,
  };
}
