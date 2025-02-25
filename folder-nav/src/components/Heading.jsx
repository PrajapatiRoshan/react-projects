import React from 'react';

const Heading = ({
  headingSize = 1,
  text = 'Choose parent directory of that folder you want to navigate with in other directory and files.',
  ...others
}) => {
  const HTag = `h${headingSize}`;

  return (
    <HTag {...others} className={'headingTag '}>
      {text}
    </HTag>
  );
};

export default Heading;
