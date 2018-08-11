﻿using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server_chat.Models
{
    public class ChatHub : Hub
    {
        public void SendToAll (string name , string message)
    {
        Clients.All.SendAsync("SendToAll", name, message);
    }
    }
}
