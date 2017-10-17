#include <iostream>
#include <string>

class Cat {
public:
        Cat(const std::string& name_ = "Kitty") : name(name_)
        {
                std::cout << "Cat " << name << " created." << std::endl;
        }
        ~Cat(){
                std::cout << "Cat " << name << " destroyed." << std::endl;
        }
        void eatFood(){
                std::cout << "Food eaten by cat named " << name << "." << std::endl;
        }
private:
        std::string name;
};

int main (){
        Cat *molly = new Cat("cat1");
        molly->eatFood();
        delete molly;
		
		//.. normally complex code paths through multiple functions, make the double-delete non-obvious

		molly->eatFood();
		delete molly;

        return 0;
}