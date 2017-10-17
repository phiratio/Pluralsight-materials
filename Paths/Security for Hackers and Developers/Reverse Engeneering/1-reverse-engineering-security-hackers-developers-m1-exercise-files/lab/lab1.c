#include<string>
#include<iostream>

using namespace std;

string get_code()
{
	string input;
	cin >> input;
	
	return input;
}

int process_input(string mystr) {
	int x;
	const char * ptr = mystr.c_str();
	x = atoi(ptr);
	return x;
}

int main(int argc, char * argv[]) {
	string userinput;
	int result=0;
	
	while(1) {
		cout << "Please enter the secret code: " << endl;
		userinput = get_code();

		cout << "Validating...." << endl;
		result = process_input(userinput);

		if(result == -10) {
			cout << "Creditials matched.  Welcome 31337 user." << endl;
			cout << "Now launching secret application calc.exe" << endl;
			system("calc");
			return(0);
		}
		else {
			cout << "Passcode incorrect." << endl << "Try again." << endl;
			system("pause");
			system("cls");
		}	
	}
}