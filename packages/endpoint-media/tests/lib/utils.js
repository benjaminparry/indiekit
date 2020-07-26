import test from 'ava';
import {JekyllConfig} from '../../../config-jekyll/index.js';
import {
  getPostTypeConfig,
  randomString,
  renderPath,
  supplant
} from '../../lib/utils.js';

test.beforeEach(t => {
  t.context.config = new JekyllConfig().config;
});

test('Get post type configuration for a given type', t => {
  const result = getPostTypeConfig('note', t.context.config);
  t.is(result.name, 'Note');
});

test('Generates random alpha-numeric string, 5 characters long', t => {
  const result = randomString();
  t.regex(result, /[\d\w]{5}/g);
});

test('Renders path from URI template and properties', t => {
  const properties = {
    slug: 'foo',
    uploaded: '2020-01-01'
  };
  const template = '{yyyy}/{MM}/{slug}';
  const result = renderPath(template, properties);
  t.is(result, '2020/01/foo');
});

test('Substitutes variables enclosed in { } braces with data from object', t => {
  const string = '{array} {string} {number}';
  const object = {
    array: ['Array'],
    string: 'string',
    number: 1
  };
  const result = supplant(string, object);
  t.is(result, '{array} string 1');
});
