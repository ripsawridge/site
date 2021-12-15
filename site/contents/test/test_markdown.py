import unittest
import makesite
import datetime

class MarkdownTest(unittest.TestCase):
    """Tests for process_markdown() function."""

    def test_simple_file(self):
        tpl = "# Ordinary markdown"
        (data, text) = makesite.process_markdown(tpl)
        self.assertEqual(text, "<h1>Ordinary markdown</h1>\n")
        self.assertEqual(len(data), 0)

    def test_empty_yaml(self):
        tpl = "---\n---\n# Ordinary markdown"
        (data, text) = makesite.process_markdown(tpl)
        self.assertEqual(text, "<h1>Ordinary markdown</h1>\n")
        self.assertEqual(len(data), 0)

    def test_simple_yaml(self):
        tpl = "---\ntitle: green\n---\n# Ordinary markdown"
        (data, text) = makesite.process_markdown(tpl)
        self.assertEqual(text, "<h1>Ordinary markdown</h1>\n")
        self.assertEqual(len(data), 1)
        self.assertEqual(data['title'], 'green')

    def test_yaml_no_start_dashes(self):
        tpl = "title: green\n---\n# Ordinary markdown"
        (data, text) = makesite.process_markdown(tpl)
        self.assertEqual(text, "<h1>Ordinary markdown</h1>\n")
        self.assertEqual(len(data), 1)
        self.assertEqual(data['title'], 'green')

    def test_yaml_complex(self):
        tpl = """---
elevation:
  - 40
  - 50
location:
  - Home
  - Store
---
# Word"""
        (data, text) = makesite.process_markdown(tpl)
        self.assertEqual(text, "<h1>Word</h1>\n")
        self.assertEqual(len(data), 2)
        self.assertEqual(len(data['elevation']), 2)
        self.assertEqual(len(data['location']), 2)
        self.assertEqual(data['location'][0], 'Home')

    def test_yaml_date(self):
        tpl = "date: 2021-10-10\n---\n# Word"
        (data, text) = makesite.process_markdown(tpl)
        self.assertEqual(text, "<h1>Word</h1>\n")
        self.assertEqual(len(data), 1)
        self.assertEqual(data['date'], '2021-10-10')


