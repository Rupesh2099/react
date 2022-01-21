import * as React from 'react';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

export default function SvgMuiLogo(props: RootSvgProps) {
  return (
    <RootSvg
      xmlns="http://www.w3.org/2000/svg"
      width={35}
      height={32}
      viewBox="0 0 35 32"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.992 6.412 1.534.895A1.02 1.02 0 0 0 0 1.775v15.593a2 2 0 0 0 .971 1.715l2.514 1.508A1 1 0 0 0 5 19.734v-9.7a.6.6 0 0 1 .898-.521l5.11 2.92a2 2 0 0 0 1.984 0l5.11-2.92a.6.6 0 0 1 .898.52v4.806a2 2 0 0 1-1.008 1.737l-5.236 2.992A1.5 1.5 0 0 0 12 20.87v3.953a2.2 2.2 0 0 0 .98 1.83l6.991 4.661a2 2 0 0 0 2.102.073l12.02-6.869A1.8 1.8 0 0 0 35 22.955V12.266a1 1 0 0 0-1.514-.857l-2.515 1.508A2 2 0 0 0 30 14.632v5.662a1.2 1.2 0 0 1-.617 1.049l-7.743 4.302a1.2 1.2 0 0 1-1.249-.05l-2.97-1.981a.7.7 0 0 1 .027-1.183l5.824-3.494A1.5 1.5 0 0 0 24 17.651V1.776a1.02 1.02 0 0 0-1.534-.881l-9.458 5.517a2 2 0 0 1-2.016 0Z M35 1.766v4.69a1.8 1.8 0 0 1-.907 1.562l-2.597 1.484A1 1 0 0 1 30 8.634V4.132a2 2 0 0 1 .971-1.715L33.486.91A1 1 0 0 1 35 1.766Z"
        fill="#007FFF"
      />
    </RootSvg>
  );
}
