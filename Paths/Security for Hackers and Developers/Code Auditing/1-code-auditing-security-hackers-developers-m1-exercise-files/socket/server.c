#include<stdio.h>
#include<stdlib.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<netinet/in.h>

char * welcome = "Welcome fair user\n";
char * msg = "howdy there!\n";
char * fail = "lamer\n";

//if "hello" is recived than "howdy there" is sent back
void handle_client(int fd)
{
	char buf[100]; //stack overflow!
        write(fd, welcome, strlen(welcome));
	read(fd, buf, 200);
	if( strstr(buf, "hello") == 0)
		write(fd, fail, strlen(fail));
	else
		write(fd, msg, strlen(msg));
	close(fd);
	exit(-1);
}
	

int main(int argc, char * argv[])
{
	//local vars
	int serverfd, fd, pid, addr_size;
	struct sockaddr_in addr;
	//usage
	//if( argc != 3)
	if( argc != 2)
	{
		//printf("Usage: %s IP PORT\n", argv[0]);
		printf("Usage: %s PORT\n", argv[0]);
		exit(-1);
	}
	//initialization of sockaddr_in struct
	addr.sin_family = AF_INET;
	//addr.sin_port = htons(atoi(argv[2]));
	addr.sin_port = htons(atoi(argv[1]));
	//addr.sin_addr.s_addr = inet_addr(argv[1]);
	addr.sin_addr.s_addr = inet_addr("0.0.0.0");
	addr_size = sizeof(addr);

	//network struct.  Bind to IP/port in argv[1], argv[2]
	if( (serverfd = socket(AF_INET, SOCK_STREAM, 0)) == -1 )
	{
		perror("socket");
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

	//fork() a new con for each client
	while(1)
	{
		fd = accept(serverfd, (struct sockaddr *)&addr, &addr_size);
		if( (pid = fork()) == 0 )
			handle_client(fd);
		else
			printf("%d child started\n", pid);
	}
	

}
