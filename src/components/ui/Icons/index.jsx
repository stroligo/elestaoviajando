/**
 * Returns an SVG element based on the specified type.
 *
 * @param {Object} props - The properties for the SVG component.
 * @param {string} props.type - The type of SVG to render. Possible values include
 * 'AngleLeft', 'AngleRight', 'Search', 'Filter', 'ClearFilter', and 'ChevronDown'.
 * @param {string} [props.color='#000'] - The color of the SVG paths.
 * @param {number} [props.width=24] - The width of the SVG element.
 * @param {number} [props.height=24] - The height of the SVG element.
 * @param {Object} [props.props] - Additional properties to be passed to the SVG element.
 * @returns {JSX.Element} The SVG element corresponding to the specified type.
 */
export function Svg({
  type,
  color = '#000',
  width = 24,
  height = 24,
  ...props
}) {
  const svgMap = {
    AngleLeft: (
      <svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M14.64 4.243c-.262.117-7.28 7.135-7.397 7.397a.877.877 0 000 .72c.117.262 7.135 7.28 7.397 7.397a.84.84 0 001.117-1.117c-.062-.139-.818-.917-3.308-3.41L9.221 12l3.228-3.23c2.49-2.493 3.246-3.271 3.308-3.41a.84.84 0 00-1.117-1.117"
          fillRule="evenodd"
          fill={color}
        />
      </svg>
    ),
    AngleRight: (
      <svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M9.66 4.236a.84.84 0 00-.417 1.124c.062.139.818.917 3.308 3.41L15.779 12l-3.228 3.23c-2.49 2.493-3.246 3.271-3.308 3.41a.84.84 0 001.117 1.117c.262-.117 7.28-7.135 7.397-7.397a.877.877 0 000-.72c-.117-.262-7.135-7.28-7.397-7.397a.863.863 0 00-.7-.007"
          fillRule="evenodd"
          fill={color}
        />
      </svg>
    ),
    Search: (
      <svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M10.18 4.206c-.176.02-.516.083-.756.14a6.834 6.834 0 00-5.077 8.23c.539 2.283 2.195 4.113 4.433 4.897.705.248 1.335.346 2.22.346 1.13 0 1.842-.152 2.856-.608.396-.178.977-.519 1.204-.707l.12-.099 1.64 1.635c1.224 1.221 1.686 1.656 1.82 1.717a.84.84 0 001.117-1.117c-.061-.134-.496-.596-1.717-1.82l-1.635-1.64.099-.12c.188-.227.529-.808.707-1.204.456-1.014.608-1.726.608-2.856 0-.885-.098-1.515-.346-2.22-1.074-3.064-4.061-4.937-7.293-4.574m1.789 1.738a5.121 5.121 0 012.655 1.416c1.449 1.438 1.896 3.485 1.191 5.46-.463 1.298-1.695 2.529-2.997 2.995-1.671.599-3.401.374-4.797-.624a5.227 5.227 0 01-2.086-3.259c-.092-.474-.092-1.39 0-1.864A5.14 5.14 0 017.376 7.36a5.167 5.167 0 013.184-1.494c.302-.029 1.074.014 1.409.078"
          fillRule="evenodd"
          fill={color}
        />
      </svg>
    ),
    Filter: (
      <svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M13.646 0H.302A.737.737 0 000 .356v.209l.11.223 5.018 6.598.013 6.125c.024.259.113.351.3.489h.218l2.872-1.528c.166-.107.282-.19.302-.415.04-.453-.009-1.018-.002-1.485.015-1.065.03-2.145.048-3.21L13.862.814 14 .562V.384c-.066-.208-.162-.313-.354-.384zM8.148 6.778a.821.821 0 00-.166.472l-.004 4.401-1.965 1.042v-5.53c0-.11-.1-.297-.164-.385C4.344 4.8 2.824 2.826 1.34.83h11.32C11.174 2.826 9.656 4.8 8.15 6.778z"
          fill={color}
        />
      </svg>
    ),
    ClearFilter: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M17.125 6.5a.875.875 0 001.75 0h-1.75zM18 5h.875A.875.875 0 0018 4.125V5zM4 5v-.875A.875.875 0 003.125 5H4zm0 4h-.875c0 .235.094.46.262.624L4 9zm5.09 5h.876a.875.875 0 00-.262-.624L9.091 14zm0 6h-.874c0 .483.392.875.875.875V20zm3.82 0v.875a.875.875 0 00.874-.875h-.875zm.874-1a.875.875 0 00-1.75 0h1.75zm-1.403-3.619a.875.875 0 101.238 1.238L12.38 15.38zM20.62 9.62A.875.875 0 0019.38 8.38L20.62 9.62zm-1.238 7a.875.875 0 101.238-1.238L19.38 16.62zM13.62 8.38A.875.875 0 1012.38 9.62L13.62 8.38zM18.875 6.5V5h-1.75v1.5h1.75zM18 4.125H4v1.75h14v-1.75zM3.125 5v4h1.75V5h-1.75zm.262 4.624l5.09 5 1.227-1.248-5.09-5-1.227 1.248zM8.216 14v6h1.75v-6h-1.75zm.875 6.875h3.818v-1.75H9.091v1.75zM13.784 20v-1h-1.75v1h1.75zm-.165-3.381l3.5-3.5-1.238-1.238-3.5 3.5 1.238 1.238zm3.5-3.5l3.5-3.5L19.38 8.38l-3.5 3.5 1.238 1.238zm3.5 2.262l-3.5-3.5-1.238 1.238 3.5 3.5 1.238-1.238zm-3.5-3.5l-3.5-3.5L12.38 9.62l3.5 3.5 1.238-1.238z"
          fill={color}
        />
      </svg>
    ),
    ChevronDown: (
      <svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M6.66 9.236a.84.84 0 00-.417 1.124c.062.138.678.777 2.649 2.748 2.729 2.73 2.73 2.73 3.108 2.73.378 0 .379 0 3.108-2.73 1.971-1.971 2.587-2.61 2.649-2.748a.84.84 0 00-1.117-1.117c-.137.062-.714.615-2.41 2.308L12 13.778l-2.23-2.227C8.074 9.858 7.497 9.305 7.36 9.243a.863.863 0 00-.7-.007"
          fillRule="evenodd"
          fill={color}
        />
      </svg>
    ),
    Calendar: (
      <svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 119.92 122.88"
        {...props}
      >
        <path
          d="M108.68,122.88H11.24A11.28,11.28,0,0,1,0,111.64V22.55A11.28,11.28,0,0,1,11.24,11.31H21.61V25.14a12.35,12.35,0,0,0,4.67,9.61,14.55,14.55,0,0,0,18.31,0,12.35,12.35,0,0,0,4.67-9.61V11.31H70.2V25.14a12.35,12.35,0,0,0,4.67,9.61,14.55,14.55,0,0,0,18.31,0,12.35,12.35,0,0,0,4.67-9.61V11.31h10.83a11.3,11.3,0,0,1,11.24,11.24v89.09a11.27,11.27,0,0,1-11.24,11.24ZM83.58,56.77h16.1a2.07,2.07,0,0,1,2.06,2v13.4a2.07,2.07,0,0,1-2.06,2H83.58a2.06,2.06,0,0,1-2-2V58.82a2.05,2.05,0,0,1,2-2Zm-31.51,0H68.18a2.06,2.06,0,0,1,2,2v13.4a2.07,2.07,0,0,1-2,2H52.07a2.06,2.06,0,0,1-2-2V58.82a2.06,2.06,0,0,1,2-2Zm-31.84,0H36.34a2.06,2.06,0,0,1,2,2v13.4a2.07,2.07,0,0,1-2,2H20.23a2.06,2.06,0,0,1-2.05-2V58.82a2.05,2.05,0,0,1,2.05-2ZM83.58,85.26h16.1a2.07,2.07,0,0,1,2.06,2v13.4a2.06,2.06,0,0,1-2.06,2.05H83.58a2.06,2.06,0,0,1-2-2.05V87.31a2.06,2.06,0,0,1,2-2Zm-31.51,0H68.18a2.06,2.06,0,0,1,2,2v13.4a2.06,2.06,0,0,1-2,2.05H52.07a2.06,2.06,0,0,1-2-2.05V87.31a2.07,2.07,0,0,1,2-2Zm-31.84,0H36.34a2.06,2.06,0,0,1,2,2v13.4a2.06,2.06,0,0,1-2,2.05H20.23a2.06,2.06,0,0,1-2.05-2.05V87.31a2.06,2.06,0,0,1,2.05-2ZM78.6,4.45C78.6,2,81,0,84,0s5.43,2,5.43,4.45V25.14c0,2.46-2.42,4.45-5.43,4.45s-5.42-2-5.42-4.45V4.45ZM30,4.45C30,2,32.44,0,35.44,0s5.42,2,5.42,4.45V25.14c0,2.46-2.42,4.45-5.42,4.45S30,27.6,30,25.14V4.45ZM3.6,43.86v66.58a8.87,8.87,0,0,0,8.84,8.84h95a8.87,8.87,0,0,0,8.85-8.84V43.86Z"
          fill={color}
        />
      </svg>
    ),
  };

  return svgMap[type];
}
