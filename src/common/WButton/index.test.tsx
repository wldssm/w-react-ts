import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import WButton from '../WButton/index';

describe('<Demo />', () => {
  it('render Foo with dumi', () => {
    const msg = 'dumi';

    render(<WButton />);
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});
