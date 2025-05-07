import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-control-regex': 'off',
    'regexp/no-dupe-disjunctions': 'off',
  },
})
