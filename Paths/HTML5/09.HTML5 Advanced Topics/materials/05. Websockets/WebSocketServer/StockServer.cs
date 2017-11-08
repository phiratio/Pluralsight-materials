using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web.Script.Serialization;

using FizzWare.NBuilder;
using Fleck;

namespace WebSocketServer
{
    public class StockServer
    {
        private Timer _timer = null;
        private IList<Stock> _stocks = null;
        List<IWebSocketConnection> _sockets = new List<IWebSocketConnection>();
        private int _index = 0;

        public void Start()
        {
            Fleck.WebSocketServer server = new Fleck.WebSocketServer("ws://localhost:8181");

            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Console.WriteLine("Connection open.");
                    this._sockets.Add(socket);
                };
                socket.OnClose = () =>
                {
                    Console.WriteLine("Connection closed");
                    this._sockets.Remove(socket);
                };
            });

            this._stocks = Builder<Stock>.CreateListOfSize(1000).WhereAll().Build();

            if (this._timer == null)
            {
                this._timer = new Timer(SendStock, null, 0, 1500);

                Console.WriteLine("");
                Console.WriteLine("Sending stock info to all connected clients.");
            }

            Console.ReadLine();
        }

        private void SendStock(Object state)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            string stock = serializer.Serialize(this._stocks[this._index]);
            this._sockets.ToList().ForEach(s => s.Send(stock));
            this._index++;

            if (this._index == 999)
            {
                this._index = 0;
            }
        }
    }
}
