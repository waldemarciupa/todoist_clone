import styled from 'styled-components';

const Span = styled.span`
  display: inline-block;
  height: 24px;
`;

const Today = () => {
  const today = new Date().getDate();

  return (
    <Span>
      <svg width='24' height='24' viewBox='0 0 24 24'>
        <g fill='#058527' fillRule='evenodd'>
          <path
            fillRule='nonzero'
            d='M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z'
            opacity='.1'
          ></path>
          <path
            fillRule='nonzero'
            d='M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z'
          ></path>
          <text
            fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
            fontSize='9'
            transform='translate(4 2)'
            fontWeight='500'
          >
            <tspan x='8' y='15' textAnchor='middle'>
              {today}
            </tspan>
          </text>
        </g>
      </svg>
    </Span>
  );
};

export default Today;
