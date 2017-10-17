#include <iostream>
#include <string>
using namespace std;

class Cat {
public:
        Cat(const string& name_ = "Kitty") : name(name_)
        {
                cout << "Cat " << name << " created." << endl;
        }
        ~Cat(){
                cout << "Cat " << name << " destroyed." << endl;  //only if on stack...
        }
        void eatFood(){
                cout << "Food eaten by cat named " << name << "." << endl;
				string up = "barfed";
				throw up;
        }
private:
        std::string name;
};

int main (){

		try{
			Cat *molly = new Cat("cat1");
			molly->eatFood();
			delete molly;
		}
		catch(string e){
			cout << "failed to eat food: " << e << endl;
		}

        // forgot to delete if exeception before line 28
		//... more code ... resource continues to leak?
}