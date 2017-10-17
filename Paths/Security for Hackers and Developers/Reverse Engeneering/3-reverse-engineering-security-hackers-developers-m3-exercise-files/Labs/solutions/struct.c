#include <stdio.h>
#include "struct.h"
int list_people(struct person *ppls)
{
	while(1)
	{
		printf("Person: %s is %d years old and wears a hatsize of %2.2f\n", ppls->name, ppls->age, ppls->hatsize);
		if(ppls->nextperson == NULL)
			break;
		ppls = ppls->nextperson;
	}

}
int main(int argc, char * argv[])
{
	struct person jared;
	struct person michelle;
	struct person ethan;
	struct person seth;
	struct person *ppl = &jared;

	strcpy(jared.name, "Jared");
	jared.age = 36;
	jared.hatsize = 8.5;
	jared.nextperson = &michelle;
	strcpy(michelle.name, "Michelle");
	michelle.age = 36;
	michelle.hatsize = 7;
	michelle.nextperson = &ethan;
	strcpy(ethan.name, "Ethan");
	ethan.age = 11;
	ethan.hatsize = 6.5;
	ethan.nextperson = &seth;
	strcpy(seth.name, "Seth");
	seth.age = 8;
	seth.hatsize = 5.5;
	seth.nextperson = NULL;

	list_people(ppl);
}
			

