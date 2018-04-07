Slim::Engine.options[:code_attr_delims] = {
  '(' => ')', '[' => ']'
}

Slim::Engine.options[:attr_list_delims] = {
  '(' => ')', '[' => ']'
}

Slim::Engine.set_options shortcut: {
  '^' => {
    tag: 'script', attr: 'id',
    additional_attrs: { type: 'text/x-handlebars-template' }
  },
  '#' => {attr: 'id'}, '.' => {attr: 'class'}
}
