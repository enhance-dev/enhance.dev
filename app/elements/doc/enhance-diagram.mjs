export default function EnhanceDiagram({ html }) {
  function svg() {
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 631 256" fill="none">
  <g id="browser" transform="matrix(0.487489,-1.69132e-18,-1.69379e-18,-0.488203,2.32316,252.824)">
      <rect x="0" y="0" width="399.352" height="512.271" style="fill:rgb(243,243,243);"/>
      <g transform="matrix(1,0,0,1,22.5365,22.1219)">
          <rect x="0" y="0" width="354.279" height="294.607" style="fill:white;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
      </g>
      <g transform="matrix(1,0,0,1,46.9946,40.2254)">
          <rect x="0" y="0" width="305.367" height="155.32" style="fill:rgb(254,244,69);stroke:rgb(26,26,26);stroke-width:2.05px;"/>
      </g>
      <g transform="matrix(2.05133,-7.10657e-18,-7.11697e-18,-2.04833,-8.49938,512.502)">
          <g transform="matrix(1.00141,0,0,1,-0.0537225,0)">
              <text x="38px" y="185.695px" style="font-family:'Rubik-Light', 'Rubik';font-weight:300;font-size:9px;fill:rgb(0,52,81);">Progressively enhance with:</text>
          </g>
          <g transform="matrix(0.998538,0,0,1,0.0558014,0)">
              <text x="38px" y="198.395px" style="font-family:'RobotoMono-Regular', 'Roboto Mono', monospace;font-size:9px;fill:rgb(0,52,81);">customElements.define()</text>
          </g>
          <g transform="matrix(0.998538,0,0,1,0.0558014,0)">
              <text x="38px" y="211.095px" style="font-family:'RobotoMono-Regular', 'Roboto Mono', monospace;font-size:9px;fill:rgb(0,52,81);">elem.addEventListener()</text>
          </g>
          <g transform="matrix(0.998538,0,0,1,0.0558014,0)">
              <text x="38px" y="223.795px" style="font-family:'Rubik-Light', 'Rubik';font-weight:300;font-size:9px;fill:rgb(0,52,81);">additional client-side</text>
          </g>
          <g transform="matrix(0.998538,0,0,1,0.181807,0)">
              <text x="124px" y="223.795px" style="font-family:'RobotoMono-Bold', 'Roboto Mono', monospace;font-size:9px;fill:rgb(0,52,81);">JS</text>
          </g>
      </g>
      <g transform="matrix(2.04833,-7.09618e-18,-7.11697e-18,-2.04833,-67.1616,457.75)">
          <text x="77px" y="143.004px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:12px;fill:rgb(0,52,81);">Execute JavaScript</text>
      </g>
      <g transform="matrix(2.04833,-7.09618e-18,-7.11697e-18,-2.04833,-67.1431,517.866)">
          <text x="84px" y="143.004px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:12px;fill:rgb(0,52,81);">Apply CSS Styles</text>
      </g>
      <g transform="matrix(1,-3.46437e-18,3.47453e-18,1,46.9946,208.387)">
          <rect x="0" y="0" width="305.367" height="50.018" style="fill:rgb(45,155,240);fill-opacity:0.3;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
      </g>
      <g transform="matrix(2.05133,-2.4486e-18,3.74125e-18,-2.04833,-78.4977,517.866)">
          <g transform="matrix(0.998538,0,0,1,0.124713,0)">
              <text x="84px" y="118.458px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:14px;fill:rgb(0,52,81);">Parse Document</text>
          </g>
      </g>
      <g transform="matrix(1,-3.85186e-34,0,1,22.5365,336.38)">
          <rect x="0" y="0" width="354.279" height="74.691" style="fill:white;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
      </g>
      <g transform="matrix(2.05133,-1.02369e-18,1.19772e-18,-2.04833,-40.6608,517.866)">
          <g transform="matrix(0.998538,0,0,1,0.0742108,0)">
              <text x="46px" y="75.141px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:14px;fill:rgb(0,52,81);">Create HTTP Requests</text>
          </g>
      </g>
      <g transform="matrix(2.04833,-4.32952e-18,1.11373e-17,-2.04833,-137.357,517.866)">
          <text x="130px" y="30.357px" style="font-family:'RubikRoman-Medium', 'Rubik';font-weight:300;font-size:18px;fill:rgb(0,52,81);">Browser</text>
      </g>
      <rect x="0" y="0" width="399.352" height="512.271" style="fill:none;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
  </g>
  <g id="enhance" transform="matrix(0.487489,0,0,-0.488203,217.777,252.824)">
      <rect x="0" y="0" width="399.352" height="512.271" style="fill:rgb(173,110,249);"/>
      <g transform="matrix(1,0,0,1,22.7978,68.6833)">
          <rect x="0" y="0" width="354.279" height="182.435" style="fill:white;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
      </g>
      <g transform="matrix(2.05133,0,0,-2.04833,-447.044,469.572)">
          <g transform="matrix(0.998538,0,0,1,0.356557,0)">
              <text x="243px" y="144.201px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:9px;fill:rgb(0,52,81);">Expand custom elements and</text>
          </g>
          <g transform="matrix(0.998538,0,0,1,0.356557,0)">
              <text x="243px" y="153.201px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:9px;fill:rgb(0,52,81);">manage slot content.</text>
          </g>
          <g transform="matrix(0.998538,0,0,1,0.356557,0)">
              <text x="243px" y="165.901px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:9px;fill:rgb(0,52,81);">Compose style and script tags</text>
          </g>
          <g transform="matrix(0.998538,0,0,1,0.356557,0)">
              <text x="243px" y="174.901px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:9px;fill:rgb(0,52,81);">from components.</text>
          </g>
      </g>
      <g transform="matrix(2.05133,0,0,-2.04833,-517.449,511.97)">
          <text x="307px" y="145.122px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:14px;fill:rgb(0,52,81);">Render HTML</text>
      </g>
      <g transform="matrix(1,0,0,1,22.5365,288.104)">
          <rect x="0" y="0" width="354.279" height="110.532" style="fill:white;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
      </g>
      <g transform="matrix(2.05133,0,0,-2.04833,-446.733,517.866)">
          <g transform="matrix(0.998538,0,0,1,0.356557,0)">
              <text x="243px" y="87.634px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:9px;fill:rgb(0,52,81);">Match incoming requests to an API</text>
          </g>
          <g transform="matrix(0.998538,0,0,1,0.356557,0)">
              <text x="243px" y="96.634px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:9px;fill:rgb(0,52,81);">function, page, or error.</text>
          </g>
      </g>
      <g transform="matrix(2.04833,0,0,-2.04833,-581.477,517.866)">
          <text x="361px" y="73.978px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:14px;fill:rgb(0,52,81);">Router</text>
      </g>
      <g transform="matrix(2.04833,0,0,-2.04833,-576.251,517.866)">
          <text x="344px" y="30.357px" style="font-family:'RubikRoman-Medium', 'Rubik';font-weight:300;font-size:18px;fill:white;">Enhance</text>
      </g>
      <rect x="0" y="0" width="399.352" height="512.271" style="fill:none;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
  </g>
  <g id="your-code" transform="matrix(0.487489,0,0,-0.488203,433.419,252.824)">
      <rect x="0" y="0" width="399.352" height="512.271" style="fill:rgb(44,221,147);"/>
      <g transform="matrix(1,0,0,1,22.5365,22.1235)">
          <rect x="0" y="0" width="354.279" height="275.559" style="fill:white;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
      </g>
      <g transform="matrix(1,0,0,1,46.9946,44.9436)">
          <rect x="0" y="0" width="305.367" height="50.018" style="fill:rgb(254,244,69);stroke:rgb(0,52,81);stroke-width:2.05px;"/>
      </g>
      <g transform="matrix(2.05133,0,0,-2.04833,-972.967,517.866)">
          <g transform="matrix(0.998538,0,0,1,0.782978,0)">
              <text x="528px" y="223.277px" style="font-family:'RobotoMono-Regular', 'Roboto Mono', monospace;font-size:12px;fill:rgb(0,52,81);">&lt;script&gt;</text>
          </g>
          <g transform="matrix(0.998538,0,0,1,0.855652,0)">
              <text x="587.109px" y="223.277px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:12px;fill:rgb(0,52,81);">tags</text>
          </g>
      </g>
      <g transform="matrix(1,0,0,1,46.9946,115.259)">
          <rect x="0" y="0" width="305.367" height="50.018" style="fill:rgb(45,155,240);fill-opacity:0.3;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
      </g>
      <g transform="matrix(2.05133,0,0,-2.04833,-961.271,517.866)">
          <g transform="matrix(0.998538,0,0,1,0.764189,0)">
              <text x="520px" y="188.949px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:12px;fill:rgb(0,52,81);">Scoped</text>
          </g>
          <g transform="matrix(0.998538,0,0,1,0.822292,0)">
              <text x="563px" y="188.949px" style="font-family:'RobotoMono-Regular', 'Roboto Mono', monospace;font-size:12px;fill:rgb(0,52,81);">&lt;style&gt;</text>
          </g>
      </g>
      <g transform="matrix(1,0,0,1,46.9946,185.266)">
          <rect x="0" y="0" width="305.367" height="50.018" style="fill:rgb(173,110,249);fill-opacity:0.2;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
      </g>
      <g transform="matrix(2.05133,0,0,-2.04833,-947.326,517.866)">
          <g transform="matrix(0.998538,0,0,1,0.752752,0)">
              <text x="512px" y="154.291px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:12px;fill:rgb(0,52,81);">Custom Elements</text>
          </g>
      </g>
      <g transform="matrix(2.05133,0,0,-2.04833,-925.444,517.866)">
          <g transform="matrix(0.998538,0,0,1,0.704617,0)">
              <text x="475px" y="127.291px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:14px;fill:rgb(0,52,81);">App Pages &amp; Elements</text>
          </g>
      </g>
      <g transform="matrix(1,0,0,1,22.5365,336.38)">
          <rect x="0" y="0" width="354.279" height="74.691" style="fill:white;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
      </g>
      <g transform="matrix(2.05133,0,0,-2.04833,-947.278,517.866)">
          <g transform="matrix(0.998538,0,0,1,0.734533,0)">
              <text x="500px" y="75.141px" style="font-family:'RubikRoman-Regular', 'Rubik';font-weight:300;font-size:14px;fill:rgb(0,52,81);">API Data Functions</text>
          </g>
      </g>
      <g transform="matrix(2.04833,0,0,-2.04833,-1003.44,517.866)">
          <text x="545.134px" y="30.357px" style="font-family:'RubikRoman-Medium', 'Rubik';font-weight:300;font-size:18px;fill:rgb(0,52,81);">Your Code</text>
      </g>
      <rect x="0" y="0" width="399.352" height="512.271" style="fill:none;stroke:rgb(0,52,81);stroke-width:2.05px;"/>
  </g>
  <g id="arrows" style="color: var(--grey-600);">
      <g id="arrow-5">
          <g transform="matrix(0.487489,0,0,-0.488203,162.186,175.002)">
              <path d="M136.032,0.499C96.077,0.499 118.352,59.065 95.322,91.717C72.107,124.63 18.611,126.064 18.611,126.064" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:4px;"/>
          </g>
          <g transform="matrix(-0.487314,-0.0130899,-0.0130708,0.488027,162.186,113.213)">
              <path d="M-23.273,11.636L0,0L-23.273,-11.636L-23.273,11.636Z" style="fill:currentColor;fill-rule:nonzero;"/>
          </g>
      </g>
      <g id="arrow-4">
          <g transform="matrix(0.487489,0,0,-0.488203,372.889,173.066)">
              <path d="M145.902,-3.47C119.156,-3.47 120.717,28.28 99.842,45.001C73.62,66.006 18.576,62.282 18.576,62.282" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:4px;"/>
          </g>
          <g transform="matrix(-0.486377,0.0329545,0.0329063,0.487089,372.889,143.273)">
              <path d="M-23.273,11.636L0,0L-23.273,-11.636L-23.273,11.636Z" style="fill:currentColor;fill-rule:nonzero;"/>
          </g>
      </g>
      <g id="arrow-3">
          <g transform="matrix(0,0.488203,-0.487489,0,535.847,93.6993)">
              <path d="M-9.636,10.436L9.636,10.436" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:4.1px;"/>
          </g>
          <g transform="matrix(2.98501e-17,0.488203,0.487489,-2.98938e-17,530.759,107.493)">
              <path d="M-23.273,11.636L0,0L-23.273,-11.636L-23.273,11.636Z" style="fill:currentColor;fill-rule:nonzero;"/>
          </g>
      </g>
      <g id="arrow-2">
          <g transform="matrix(0.487489,0,0,-0.488203,401.472,85.1155)">
              <path d="M0.8,-0.153C21.868,-0.153 28.859,14.412 47.958,23.307C71.522,34.282 105.893,34.129 105.893,34.129" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:4px;"/>
          </g>
          <g transform="matrix(0.487484,0.00216672,0.00216355,-0.488198,462.169,68.4937)">
              <path d="M-23.273,11.636L0,0L-23.273,-11.636L-23.273,11.636Z" style="fill:currentColor;fill-rule:nonzero;"/>
          </g>
      </g>
      <g id="arrow-1">
          <g transform="matrix(0.487489,0,0,-0.488203,185.283,82.0585)">
              <path d="M0.674,0.051C0.674,0.051 25.494,15.895 44.601,21.079C72.627,28.683 121.362,28.816 121.362,28.816" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:4px;"/>
          </g>
          <g transform="matrix(0.487487,-0.00133083,-0.00132889,-0.488201,253.522,67.9656)">
              <path d="M-23.273,11.636L0,0L-23.273,-11.636L-23.273,11.636Z" style="fill:currentColor;fill-rule:nonzero;"/>
          </g>
      </g>
  </g>
</svg>
`.trim()
  }

  return html`${svg()}`
}
