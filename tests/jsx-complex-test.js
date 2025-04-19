import rule from '../lib/rules/no-changelog-comments.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});

ruleTester.run('jsx-complex-test', rule, {
  valid: [
    // JSX with expression that isn't a comment
    `function Component() {
      return (
        <div>
          {isLoading ? <Spinner /> : <Content />}
          <span>Hello</span>
        </div>
      );
    }`,
    
    // JSX with multiple expressions
    `function Component() {
      return (
        <div>
          {isLoading && <Spinner />}
          {/* This is a normal comment */}
          {data.map(item => <Item key={item.id} {...item} />)}
        </div>
      );
    }`,
  ],
  
  invalid: [
    // JSX with changelog comment between expressions
    {
      code: `function Component() {
        return (
          <div>
            {isLoading && <Spinner />}
            {/* Removed error message */}
            {data.map(item => <Item key={item.id} {...item} />)}
          </div>
        );
      }`,
      output: `function Component() {
        return (
          <div>
            {isLoading && <Spinner />}
            
            {data.map(item => <Item key={item.id} {...item} />)}
          </div>
        );
      }`,
      errors: [{ messageId: 'changelogComment' }],
    },
    
    // JSX with changelog comment inside attribute
    {
      code: `function Component() {
        return (
          <div 
            className="container"
            data-testid="main-container"
            onClick={() => {
              // Updated to use a more efficient approach
              handleClick();
            }}
          >
            <span>Hello</span>
          </div>
        );
      }`,
      output: `function Component() {
        return (
          <div 
            className="container"
            data-testid="main-container"
            onClick={() => {
              
              handleClick();
            }}
          >
            <span>Hello</span>
          </div>
        );
      }`,
      errors: [{ messageId: 'changelogComment' }],
    },
    
    // JSX with changelog comment inside a block
    {
      code: `function Component() {
        // Get data from API
        const getData = () => {
          /* Changed to fetch from new API */
          return fetch('/api/data');
        };
        
        return <div>{getData()}</div>;
      }`,
      output: `function Component() {
        // Get data from API
        const getData = () => {
          
          return fetch('/api/data');
        };
        
        return <div>{getData()}</div>;
      }`,
      errors: [{ messageId: 'changelogComment' }],
    },
  ],
});