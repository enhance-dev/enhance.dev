export default function importTransform({ map = {} }) {
  return function transform({ raw }) {
    const importRegex = new RegExp(
      /(import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s])(\/_bundles\/.*[@\w_-]+)(["'\s].*;?$)/,
      'gm'
    )
    let str = raw.replace(
      importRegex,
      (str, before, importName, location, after) =>
        `${before}${map[location]}${after}`
    )
    str = str.replace(/__WORKER_SCRIPT_URL__/g, map['/_bundles/worker.mjs'])
    return str
  }
}
