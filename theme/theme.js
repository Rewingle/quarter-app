export default {
  breakpoints: [
    '480px',
    '640px',
    '768px',
    '1024px',
    '1200px',
    '1367px',
    '1440px',
  ],
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    fonts: {
      body:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      heading: 'inherit',
      monospace: 'Menlo, monospace',
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
    fontWeights: {
      body: 400,
      heading: 700,
      bold: 700,
    },
    lineHeights: {
      body: 1.5,
      heading: 1.125,
    },
    colors: {
      text: '#000',
      background: '#fff',
      primary: '#06b6d4',
      secondary: '#30c',
      muted: '#f6f6f6',
    },
    text: {
      heading: {
        fontFamily: 'heading',
        lineHeight: 'heading',
        fontWeight: 'heading',
      },
    },
    styles: {
      root: {
        fontFamily: 'body',
        lineHeight: 'body',
        fontWeight: 'body',
      },
      h1: {
        variant: 'text.heading',
        fontSize: 5,
      },
      h2: {
        variant: 'text.heading',
        fontSize: 4,
      },
      h3: {
        variant: 'text.heading',
        fontSize: 3,
      },
      h4: {
        variant: 'text.heading',
        fontSize: 2,
      },
      h5: {
        variant: 'text.heading',
        fontSize: 1,
      },
      h6: {
        variant: 'text.heading',
        fontSize: 0,
      },
      pre: {
        fontFamily: 'monospace',
        overflowX: 'auto',
        code: {
          color: 'inherit',
        },
      },
      code: {
        fontFamily: 'monospace',
        fontSize: 'inherit',
      },
      table: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0,
      },
      th: {
        textAlign: 'left',
        borderBottomStyle: 'solid',
      },
      td: {
        textAlign: 'left',
        borderBottomStyle: 'solid',
      },
    },
  }