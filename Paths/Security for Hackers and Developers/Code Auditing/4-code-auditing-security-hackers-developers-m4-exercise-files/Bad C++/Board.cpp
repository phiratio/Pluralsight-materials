//Compile in cygwin via 'make Board'

#include <stdlib.h>
#include <iostream>
using namespace std;

class Board
{
private:
	unsigned int m_x;
	unsigned int m_y;
	int * m_squares;
public:
	Board(unsigned int x = 10, unsigned int y = 10);
	int getSquare(unsigned int x, unsigned int y);
	int setSquare(unsigned int x, unsigned int y, int square);
};

Board::Board(unsigned int x_dim, unsigned int y_dim)
{
	int len = x_dim * y_dim;
	//We don't need these do we?
	//m_x = 0;
	//m_y = 0;
	//m_squares = NULL;
	
	if(x_dim > 0 && (x_dim <= (unsigned int)-1/y_dim) && len <= (size_t)-1/sizeof(m_squares[0]) )
	{
		m_x = x_dim;
		m_y = y_dim;
		m_squares = (int*)calloc(len, sizeof(m_squares[0])); //I'm sure this if fine.
	}
}

int Board::getSquare(unsigned int x, unsigned int y)
{
	if( x >= m_x || y >= m_y) return false; //No valid answer will ever be false will it?
	return m_squares[ y * m_x + x];
}

int Board::setSquare(unsigned int x, unsigned int y, int square)
{
	if( x > m_x || y > m_y) return false;
	m_squares[ y * m_x + x] = square; //This is ok, right?
	return true;
}

//Validate Input
bool isvalidInt(string str)
{
	int start = 0;
	int i;
	bool valid = true;
	bool sign = false;

	if (int(str.length()) == 0 ) valid = false;
	if (str.at(0) == '-' || str.at(0) == '+')
	{
		sign = true;
		start = 1;
	}
	if (sign && int(str.length()) == 1) valid = false;

	i = start;
	while ( valid && i < int(str.length()))
	{
		if(!isdigit(str.at(i))) valid = false;;
		i++;
	}

	return valid;
}
int getInt()
{
	bool not_an_int = true;
	string svalue;

	while(not_an_int)
	{
		try
		{
			cin >> svalue;
			if (!isvalidInt(svalue)) throw svalue;
		}
		catch (string e)
		{
			cout << "Invalid integer - please try again: ";
			continue;
		}
		not_an_int = false;
	}
	return atoi(svalue.c_str());
}

void get_square(Board B)
{
	char b;
	string temp;
	int c, val, answer;
	system("clear");
	unsigned int x, y;

	while (1)
	{
		cout << "Get Square options:" << endl;
		cout << "\t1. Enter x and y" << endl;
		cout << "\t2. Return to previous menu" << endl;

		b = cin.peek();
		if( b == '\n')
			cin.ignore();
		getline(cin, temp);
		c = atoi(temp.c_str());

		switch (c)
		{
			case 1:
				cout << "Enter X: " << endl;
				x = getInt();	
				cout << "Enter Y: " << endl;
				y = getInt();
				
				answer = B.getSquare(x, y);
				if ( answer == false)
					cout << "Bad values, try again!" << endl;
				else
					cout << "The value at that location is: " << B.getSquare(x, y) << endl;
				break;
			case 2:
				return;
			default:
				cout << "Bad choice!" << endl;
		}
		cout << "Press 'c' + enter to continue" << endl; cin >> b;
		system("clear");
	}

}

void set_square(Board B)
{
	char b;
	string temp;
	int c, val;
	system("clear");
	unsigned int x, y;

	while (1)
	{
		cout << "Set Square options:" << endl;
		cout << "\t1. Enter x and y" << endl;
		cout << "\t2. Return to previous menu" << endl;

		b = cin.peek();
		if( b == '\n')
			cin.ignore();
		getline(cin, temp);
		c = atoi(temp.c_str());

		switch (c)
		{
			case 1:
				cout << "Enter X: " << endl;
				x = getInt(); 
				cout << "Enter Y: " << endl;
				y = getInt();
				cout << "Enter square value: " << endl;
				val = getInt();
				if( B.setSquare(x, y, val) == false)
					cout << "Bad values try again!" << endl;
				else
					cout << "Done." << endl;
				break;
			case 2:
				return;
			default:
				cout << "Bad choice!" << endl;
		}
		cout << "Press 'c' + enter to continue" << endl; cin >> b;
		system("clear");
	}

}

int main(int argc, char *argv[])
{
	if (argc != 3)
	{
		cout << "Usage: provide the [X] and [Y] coordinates of the board" << endl;
		exit(-1);
	}

	Board my_board(atoi(argv[1]), atoi(argv[2]));

	char b;
	string temp;
	int c;
	system("clear");

	while (1)
	{
		cout << "Board modifications:" << endl;
		cout << "\t1. Set a square" << endl;
		cout << "\t2. Get a square" << endl;
		cout << "\t3. exit" << endl;

		b = cin.peek();
		if( b == '\n')
			cin.ignore();
		getline(cin, temp);
		c = atoi(temp.c_str());

		switch (c)
		{
			case 1:
				set_square(my_board);
				break;
			case 2:
				get_square(my_board);
				break;
			case 3:
				exit(0);
			default:
				cout << "Bad choice!" << endl;
		}
		system("clear");
	}
}
	
