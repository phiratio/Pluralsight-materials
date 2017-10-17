#include<stdio.h>
#include<stdlib.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<netinet/in.h>

int main(int argc, char * argv[])
{
	char buf[100]; //stack overflow!
	struct sockaddr_in addr;
	if( argc != 4)
	{
		printf("Usage: %s IP(no names) PORT MSG\n", argv[0]);
		exit(-1);
	}
	addr.sin_family = AF_INET;
	addr.sin_port = htons(atoi(argv[2]));
	addr.sin_addr.s_addr = inet_addr(argv[1]);

	int fd = socket(AF_INET, SOCK_STREAM, 0);

	if( connect(fd, (struct sockaddr *)&addr, sizeof(addr)) == -1)
	{
		perror("connect");
		exit(-1);
	}

	memset(buf, 0x00, 100);
	read(fd, buf, 200);
	printf("GOT: %s", buf);
	write(fd, argv[3], strlen(argv[3]));
	printf("SENT: %s\n", argv[3]);
	memset(buf, 0x00, 100);
	read(fd, buf, 200);
	printf("GOT: %s", buf);
}

		
