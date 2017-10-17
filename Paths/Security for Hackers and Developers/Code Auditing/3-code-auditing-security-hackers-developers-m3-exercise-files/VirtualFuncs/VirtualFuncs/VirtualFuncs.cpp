// VirtualFuncs.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

class Parent_Class_One {
protected:
	double a;

public:
	Parent_Class_One(double = 2);
	double FirstFunction(double);
	double SecondFunction(double);
};

Parent_Class_One::Parent_Class_One(double val) {
	a = val;
}
double Parent_Class_One::FirstFunction(double num) {
	return(num/2);
}
double Parent_Class_One::SecondFunction(double num) {
	return( FirstFunction(num) + 1000 );
}

class Derived_Class_Two : public Parent_Class_One {
public: 
	virtual double FirstFunction(double num); //overrides inherited FirstFunction
};

double Derived_Class_Two::FirstFunction(double num) {
	return(num/4);
}


int _tmain(int argc, _TCHAR* argv[])
{
	Parent_Class_One Obj1;
	Derived_Class_Two Obj2;

	
	cout << "This is correct: " << Obj1.SecondFunction(20) << endl;
	
	cout << "This isn't: " << Obj2.SecondFunction(20) << ".  Why?"<< endl;

	system("pause");
	return 0;
}

