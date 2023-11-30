import { NextRequest } from 'next/server'
import ws from 'ws'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest): Promise<Response> => {
  req.upgrade((request, socket) => {
    const server = new ws.Server({ noServer: true })

    server.handleUpgrade(request, socket, Buffer.alloc(0), (ws) => {
      ws.on('message', (message) => {
        if (message.toString('utf8') === 'ping') {
          ws.send('pong')
        }
      })

      ws.on('error', (err) => {
        server.close()
      })

      ws.on('close', () => {
        server.close()
      })
    })
  })
}
