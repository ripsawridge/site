import unittest
import makesite
import os
import shutil
import json

from test import path


class MainTest(unittest.TestCase):
    def setUp(self):
        path.move('_site', '_site.backup')
        path.move('params.json', 'params.json.backup')

    def tearDown(self):
        path.move('_site.backup', '_site')
        path.move('params.json.backup', 'params')

    def test_site_missing(self):
        makesite.main()

    def test_site_exists(self):
        os.mkdir('_site')
        with open('_site/foo.txt', 'w') as f:
            f.write('foo')

        self.assertTrue(os.path.isfile('_site/foo.txt'))
        makesite.main()
        self.assertFalse(os.path.isfile('_site/foo.txt'))

    def test_default_params(self):
        makesite.main()

        with open('_site/blog/practical-yoga/index.html') as f:
            s1 = f.read()

        with open('_site/blog/rss.xml') as f:
            s2 = f.read()

        shutil.rmtree('_site')

        self.assertIn('<a href="/">Home</a>', s1)
        self.assertIn('<title>Practical Yoga</title>', s1)
        self.assertIn('Published on 2021-10-10 by <b>Michael Stanton</b>', s1)

        self.assertIn('<link>https://www.mountainwerks.org/</link>', s2)
        self.assertIn('<link>https://www.mountainwerks.org/blog/practical-yoga/</link>', s2)

    def test_json_params(self):
        params = {
            'base_path': '/base',
            'author': 'Bar',
            'site_url': 'http://localhost/base'
        }
        with open('params.json', 'w') as f:
            json.dump(params, f)
        makesite.main()

        with open('_site/blog/practical-yoga/index.html') as f:
            s1 = f.read()

        with open('_site/blog/rss.xml') as f:
            s2 = f.read()

        shutil.rmtree('_site')

        self.assertIn('<a href="/base/">Home</a>', s1)
        self.assertIn('<title>Practical Yoga</title>', s1)
        self.assertIn('Published on 2021-10-10 by <b>Bar</b>', s1)

        self.assertIn('<link>http://localhost/base/</link>', s2)
        self.assertIn('<link>http://localhost/base/blog/practical-yoga/</link>', s2)
