const { createApp } = Vue

  createApp({
    data() {
      return {
        message: "",
        name: "Name",
        connected: false,
        stompClient: {},
        messages: [],
        brokerUrl: "ws://localhost:8080"
      }
    },
    methods: {
        async sendMessage() {
            await this.stompClient.publish({
                destination: "/app/global",
                body: JSON.stringify({"name": this.name, "message": this.message, "type": "msg"})
            });
            this.message = "";
        },
        async connect() {
            this.stompClient.activate();
            this.connected = true;
        }, 
        async disconnect() {
            await this.stompClient.deactivate();
            this.connected = false;
            console.log("Disconnected");
        },
        onMessageReceived(message) {
            console.log(message);
            this.messages.unshift(message);
        },
        establishNewSTOMPConnection() {
            this.stompClient = new StompJs.Client({
                brokerURL: `${this.brokerUrl}/hello`,
            });

            this.stompClient.onConnect = (frame) => {
                this.connected = true;
                console.log('Connected: ' + frame);
                this.stompClient.subscribe('/topic/messages', (message) => {
                    this.onMessageReceived(JSON.parse(message.body));
                });
            };
    
            this.stompClient.onWebSocketError = (error) => {
                console.error('Error with websocket', error);
                this.connected = false;
            };
            
            this.stompClient.onStompError = (frame) => {
                console.error('Broker reported error: ' + frame.headers["message"]);
                console.error('Additional details: ' + frame.body);
                this.connected = false;
            };

            this.connect();
        }
    },
  }).mount('#app');