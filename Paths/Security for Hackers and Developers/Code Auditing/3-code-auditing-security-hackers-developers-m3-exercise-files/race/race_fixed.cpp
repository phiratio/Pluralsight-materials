#include <iostream>
#include <string>
#include <fcntl.h>
#include <stdlib.h>
using namespace std;


class SecureFileAccess {
private:
	int fd, caller_ID, owner_ID;
	char * filename;
public:
	SecureFileAccess(char *);
	void check_and_open();
	void work();
	~SecureFileAccess();
};
SecureFileAccess::SecureFileAccess(char * fn) {
	filename = fn;
	caller_ID = getuid();
	owner_ID = geteuid();
}
SecureFileAccess::~SecureFileAccess() {
	close(fd);
}
void SecureFileAccess::check_and_open() {
	string s = "Permissions problem.";
	//set effective id before opening the file
	if( setresuid(-1, caller_ID, owner_ID) != 0) {
		throw s;
	}
	sleep(1);
	fd = open(filename, O_RDONLY);
	//reset the efective user id to it's origial value
	if( setresuid(-1, owner_ID, caller_ID) != 0 ) {
		throw s;
	}
}
void SecureFileAccess::work() {
	if (fd < 0) {
		char buf[21];
		read(fd, buf, 20);
		buf[20]=0x00;
		cout << "Up to first 20 bytes are:"<< endl << buf << endl;
	}
	else
		cout << "File error" << endl;
}

int main ( int argc, char * argv[]) {
	int i;
	cout << "Real ID=" << getuid() << " Effective ID=" << geteuid() <<endl;
	cout << "Printing requested files..." << endl;

	for(i=1; i < argc; i++)	{
		try {
			SecureFileAccess fileobj(argv[i]);
			fileobj.check_and_open();
			fileobj.work();
		}
		catch(string s) {
			cout << "Exiting due to error: " << s << endl;
			exit(-1);
		}
	}
}