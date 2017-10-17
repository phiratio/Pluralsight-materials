#include<stdio.h>
#include<stdlib.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<sys/time.h>

char * welcome = "Welcome little user\n";
char * msg = "howdy there!\n";
char * fail = "lamer\n";

//if "hello" is recived than "howdy there" is sent back
void handle_client(int fd)
{
	char buf[100]; //stack overflow!
	read(fd, buf, 200);
	if( strstr(buf, "hello") == 0)
		write(fd, fail, strlen(fail));
	else
		write(fd, msg, strlen(msg));
	close(fd);
}
	

int main(int argc, char * argv[])
{
	//local vars
	int serverfd, fd, pid, addr_size, i;
	struct sockaddr_in addr;
	fd_set readfds;
	int opt=1;
	int max_clients=10;
	int client_socket[max_clients];
	for(i=0; i<max_clients; i++)
		client_socket[i]=0;
	//usage
	if( argc != 2)
	{
		printf("Usage: %s PORT\n", argv[0]);
		exit(-1);
	}
	//initialization of sockaddr_in struct
	addr.sin_family = AF_INET;
	addr.sin_port = htons(atoi(argv[1]));
	addr.sin_addr.s_addr = inet_addr("0.0.0.0");
	addr_size = sizeof(addr);

	//network struct.  Bind to IP/port in argv[1], argv[2]
	if( (serverfd = socket(AF_INET, SOCK_STREAM, 0)) == -1 )
	{
		perror("socket");
		exit(-1);
	}
	if( setsockopt(serverfd, SOL_SOCKET, SO_REUSEADDR, (char *)&opt, sizeof(opt)) < 0){
		perror("setsockopt");
		exit(-1);
	}
	if( bind(serverfd, (struct sockaddr *)&addr, sizeof(addr)) == -1 )
	{
		perror("bind");
		exit(-1);
	}	
	if( listen(serverfd, 5) == -1)
	{
		perror("listen");
		exit(-1);
	}	

	//use select() to process client connections
	while(1)
	{
		FD_ZERO(&readfds);
		FD_SET(serverfd, &readfds);
		for( i=0; i<max_clients; i++)
		{
			if( client_socket[i] > 0)
				FD_SET(client_socket[i], &readfds);
		}
		if( select(max_clients+3, &readfds, NULL, NULL, NULL) < 0)
		{
			perror("select");
			exit(-1);
		}
		if(FD_ISSET(serverfd, &readfds))
		{
		  fd = accept(serverfd, (struct sockaddr *)&addr, &addr_size);
			printf("New fd %d created\n", fd);
			write(fd, welcome, strlen(welcome));
			for(i=0; i<max_clients; i++)
			{
				if( client_socket[i] == 0)
				{
					client_socket[i] = fd;
					printf("Added to sockets as %d\n", i);
					i = max_clients;
				}
			}
		}
		for(i=0; i<max_clients; i++)
		{
			if(FD_ISSET(client_socket[i], &readfds))
			{
				handle_client(client_socket[i]);
				client_socket[i] = 0;
			}
		}
	}
}
