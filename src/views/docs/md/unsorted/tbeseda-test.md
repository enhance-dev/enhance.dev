---
title: tbeseda testing some things

---

CodeMirror experiments

## A `<doc-code>` Custom Element

This 👇 code block is rendered and highlighted on the server with arcdown + hljs.
Then CodeMirror takes over in the browser and re-instantiates it as an editor.

<doc-code>

```javascript
const { path: activePath, pathParameters } = request
let docPath = pathParameters?.proxy || 'index'
if (docPath.match(/\/$/)) docPath += 'index' // trailing slash == index.md file

const docURL = new URL(
  `./node_modules/@architect/views/docs/md/${docPath}.md`,
  import.meta.url
)
const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
const doc = await renderMd(docMarkdown
```

</doc-code>

### Markdown Source

So the source authored in .md looks like:

````html
<!-- the lang attr defaults to "javascript -->
<!-- the lang attr isn't used yet -->
<doc-code lang="javascript">

```javascript
const { path: activePath, pathParameters } = request
let docPath = pathParameters?.proxy || 'index'
if (docPath.match(/\/$/)) docPath += 'index' // trailing slash == index.md file

const docURL = new URL(
  `./node_modules/@architect/views/docs/md/${docPath}.md`,
  import.meta.url
)
const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
const doc = await renderMd(docMarkdown
```

</doc-code>
````

Try some Markdown...

<!-- the lang attr isn't used yet -->
<doc-code lang="markdown">

```markdown
# This is a title

## a subtitle

> blockquote
```

</doc-code>

and some PHP!

<!-- the lang attr isn't used yet -->
<doc-code lang="php">

```php
<?php
class FooModel
{
    protected $db;
    public function __construct(PDO $db)
    {
        $this->db = $db;
    }
    public function getAllFoos() {
        return $this->db->query('SELECT * FROM table');
    }
}
?>

<?php foreach ($fooList as $row): ?>
    <li><?= $row['field1'] ?> - <?= $row['field1'] ?></li>
<?php endforeach ?>
```

</doc-code>
