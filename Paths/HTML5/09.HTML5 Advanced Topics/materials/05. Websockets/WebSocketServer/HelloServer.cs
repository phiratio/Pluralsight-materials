using System;
using System.Collections.Generic;
using System.Linq;

using Fleck;

namespace WebSocketServer
{
    public class HelloServer
    {
        public void Start()
        {
            List<IWebSocketConnection> sockets = new List<IWebSocketConnection>();
            Fleck.WebSocketServer server = new Fleck.WebSocketServer("ws://localhost:8181");

            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Console.WriteLine("Connection open.");
                    sockets.Add(socket);
                };
                socket.OnClose = () =>
                {
                    Console.WriteLine("Connection closed");
                    sockets.Remove(socket);
                };
                socket.OnMessage = message =>
                {
                    Console.WriteLine("Client Says: " + message);
                    sockets.ToList().ForEach(s => s.Send(" client says: " + message));
                };
            });

            string input = Console.ReadLine();
            while (input != "exit")
            {
                sockets.ToList().ForEach(s => s.Send(input));
                input = Console.ReadLine();
            }
        }
    }
}
