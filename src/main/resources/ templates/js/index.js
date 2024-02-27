const { createApp } = Vue

  createApp({
    data() {
      return {
        message: '',
        name: 'Name',
        connected: false,
        stompClient: {},
        messages: []
      }
    },
    methods: {
        async sendMessage() {
            await this.stompClient.publish({
                destination: "/app/global",
                body: JSON.stringify({"name": this.name, "message": this.message, "type": "msg"})
            });
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
        }
    },
    mounted() {
        this.stompClient = new StompJs.Client({
            brokerURL: 'ws://localhost:8080/hello'
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
        };
        
        this.stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers["message"]);
            console.error('Additional details: ' + frame.body);
        };
    }
  }).mount('#app');