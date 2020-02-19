import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './button';

afterEach(cleanup);

test('Button', () => {
  const props = {
    className: 'btn-test',
    color: 'primary',
    size: 'lg'
  };
  const { container, rerender } = render(<Button {...props}>Button</Button>);

  expect(container.firstChild).toMatchSnapshot();

  rerender(
    <Button {...props} disabled>
      Button
    </Button>
  );

  expect(container.firstChild).toHaveClass('btn--disabled');
  expect(container.firstChild).toHaveAttribute('disabled');
});
