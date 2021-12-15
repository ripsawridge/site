import unittest
import makesite

class RenderTest(unittest.TestCase):
    """Tests for render() function."""

    def test_oneline_template(self):
        tpl = 'foo {{ key1 }} baz {{ key2 }}'
        out = makesite.render({}, tpl, key1='bar', key2='qux')
        self.assertEqual(out, 'foo bar baz qux')

    def test_multiline_template(self):
        tpl = 'foo {{ key1 }}\nbaz {{ key1 }}'
        out = makesite.render({}, tpl, key1='bar')
        self.assertEqual(out, 'foo bar\nbaz bar')

    def test_repeated_key(self):
        tpl = 'foo {{ key1 }} baz {{ key1 }}'
        out = makesite.render({}, tpl, key1='bar')
        self.assertEqual(out, 'foo bar baz bar')

    def test_multiline_placeholder(self):
        tpl = 'foo {{\nkey1\n}} baz {{\nkey2\n}}'
        out = makesite.render({}, tpl, key1='bar', key2='qux')
        self.assertEqual(out, 'foo bar baz qux')

    def test_plugin_simple(self):
        # create a simple plugin. Only the first argument is handled.
        plugins = makesite.create_plugins()
        plugins['baz'] = lambda params, arg: arg
        tpl = 'foo {% baz arg1 arg2 %} bar'
        out = makesite.render(plugins, tpl)
        self.assertEqual(out, 'foo arg1 bar')

    def test_plugin_image(self):
        # Use the builtin image plugin
        plugins = makesite.create_plugins()
        tpl = 'foo {% image arg1 arg2 %} bar'
        out = makesite.render(plugins, tpl)
        self.assertEqual(out, 'foo <a href=arg1><img src=arg1></a><br/> bar')

    def test_plugin_use_params(self):
        # use params in the plugin
        tpl = 'foo {% baz arg1 arg2 %} bar'
        plugins = makesite.create_plugins()
        plugins['baz'] = lambda params, arg: params['key1'] + ' ' + arg
        out = makesite.render(plugins, tpl, key1='fuzz')
        self.assertEqual(out, 'foo fuzz arg1 bar')
