import React from 'react';
import {
  render, screen,
} from '@testing-library/react';

import '../../test/jest/__mock__';

import { OverlayView } from './index';

const renderOverlayView = () => {
  render(
    <>
      <header data-testid="header_id" />
      <OverlayView>
        <span data-testid="content_id" />
      </OverlayView>
    </>
  );
};

describe('rendering OverlayView with existing header tag', () => {
  it('should hide header', () => {
    renderOverlayView();

    expect(screen.getByTestId('header_id')).not.toBeVisible();
  });

  it('should display overlay view', () => {
    renderOverlayView();

    expect(screen.getByTestId('overlayView')).toBeVisible();
  });

  it('should display overlay view content', () => {
    renderOverlayView();

    expect(screen.getByTestId('content_id')).toBeVisible();
  });
});

describe('rendering OverlayView without existing header tag', () => {
  const renderOverlayViewEmpty = () => {
    render(
      <OverlayView>
        Simple text
      </OverlayView>
    );
  };

  it('should display overlay view', () => {
    renderOverlayViewEmpty();

    expect(screen.getByTestId('overlayView')).toBeVisible();
  });

  it('should display simple text', () => {
    renderOverlayViewEmpty();

    expect(screen.getByText('Simple text')).toBeVisible();
  });
});
