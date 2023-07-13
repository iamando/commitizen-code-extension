import * as process from 'child_process'

/**@param command @returns {Promise}*/
function exec(command: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    process.exec(command, (err, out) => {
      if (err) {
        return reject(err)
      }

      return resolve(out)
    })
  })
}

/**@param command*/
function spawn(command: string, args: string): void {
  const p = process.spawn(command, [args], { cwd: '.' })

  p.stdout.on('data', data => {
    console.log('stdout: ' + data.toString())
  })

  p.stderr.on('data', data => {
    console.log('stderr: ' + data.toString())
  })

  p.on('close', code => {
    console.log('closed: ' + code)
  })
}

/**@param command @param args*/
export function execute(command: string, args: string): String {
  const cmd: string = command + ' ' + args

  const proc = process.spawnSync(cmd, {
    shell: true,
    encoding: 'utf8',
  })

  let data = proc.stdout.toString()

  if (proc !== null) {
    if (proc.stdout !== null && proc.stdout.toString() !== '') {
      data = proc.stdout.toString()
    }
    if (proc.stderr !== null && proc.stderr.toString() !== '') {
      data = proc.stderr.toString()
    }
  }

  return data
}

export { exec, spawn }
