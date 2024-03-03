/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Layout from '../Layout';
import Content from '../../content/Content';
import Sidebar from '../../sidebar/Sidebar';
import Header from '../../header/Header';
import { configureAppStore } from '../../../store/store';
import { Theme } from '../../theme';

describe('Layout', () => {
  const mockStore = configureAppStore();
  it('renders correctly with one child', () => {
    render(
      <Provider store={mockStore}>
        <Layout>
          <Content>Test Content</Content>
        </Layout>
      </Provider>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders correctly with two children', () => {
    render(
      <Provider store={mockStore}>
        <Layout>
          <Sidebar>Test Sidebar</Sidebar>
          <Content>Test Content</Content>
        </Layout>
      </Provider>
    );
    expect(screen.getByText('Test Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders correctly with three children', () => {
    render(
      <Provider store={mockStore}>
        <Layout>
          <Header>Test Header</Header>
          <Sidebar>Test Sidebar</Sidebar>
          <Content>Test Content</Content>
        </Layout>
      </Provider>
    );
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Test Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render when children structure is invalid', () => {
    console.error = jest.fn();

    render(
      <Provider store={mockStore}>
        <Layout>
          <Sidebar>Test Sidebar</Sidebar>
          <Header>Test Header</Header>
          <Content>Test Content</Content>
        </Layout>
      </Provider>
    );
    expect(console.error).toHaveBeenCalledWith(
      'Invalid structure of children in Layout component'
    );
    expect(screen.queryByText('Test Header')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Sidebar')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  // tests for the theme classes

  it('should render the correct active tab background ', async () => {
    render(
      <Provider store={mockStore}>
        <Layout>
          <Header>Active Tab</Header>
          <Sidebar>
            <Theme.PrimaryText>Sidebar Primary</Theme.PrimaryText>
            <Theme.SecondaryText>Sidebar Secondary</Theme.SecondaryText>
          </Sidebar>
          <Content>Test Content</Content>
        </Layout>
      </Provider>
    );

    // asserting the right background with the store default theme
    expect(screen.getByText('Active Tab')).toHaveStyle(
      'background-color: rgba(13, 31, 85, 0.902);'
    );

    expect(screen.getByText('Sidebar Primary')).toHaveStyle(
      'color: rgb(159, 169, 202)'
    );

    expect(screen.getByText('Sidebar Secondary')).toHaveStyle(
      'color: rgb(101, 111, 148)'
    );
  });
});
