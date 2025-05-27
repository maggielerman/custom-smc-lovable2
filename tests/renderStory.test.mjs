import assert from 'assert';
import { renderStory } from '../dist_test/renderStory.js';
const template = { pageDescriptors: [{ text: 'Hello {name}' }, { text: '{greeting} world' }] };
const result = renderStory(template, { name: 'Alice', greeting: 'Hi' });
assert.deepStrictEqual(result, ['Hello Alice', 'Hi world']);
console.log('renderStory tests passed');
