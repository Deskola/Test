"""
Problem 1: You have commented ou the class name therefore it's being ingnored when the code is interprated
Problem 2: There should be no value(s) before a class declaration
Problem 3: There is no identation in the code (Indentation should be tab or four line)
			inside a class, fuction, control statement.
Problem 5: In by python, variables are declared and initialized in
			separarte line i.e
			a = 1
			b = 2
Problem 6: The member variable should be declared and initialized inside
			the constructor NOT outside i.e Remove the initial 
			declaration and initialization

"""
# An SMS Simulation class SMSMessage(object):

hasBeenRead = False messageText = text fromNumber = number
def __init__ (self,hasBeenRead,messageText,fromNumber):
	self.hasBeenRead = False self.messageText = text self.fromNumber = number
def MarkASRead (self):
	if userChoice == read:
	self.hasBeenRead = True

#Member fuctions should always have self a default argument and 
#should be indented inside the class
def add_sms ():
def get_count ():
def get_message ():
def get_unread_messages ():
def remove ():

no_1 = SMSMessage( False , "Hello" , "0798653452" )
no_2 = SMSMessage( False , "WYD" , "0845673864" )
no_3 = SMSMessage( False , "How are you?" , "0631873298" )

#Declare the variables in separate line
SMSStore = [] userChoice = ""

#You should use a condition statement like if/else instead of while loop
while userChoice != "quit" :
	"""
	This is python version 3. There you should use input()
	instead of raw_input()

	"""	
	userChoice = raw_input( "What would you like to do - read/send/quit?" )
	if userChoice == "read" :
		"""
		You have commented out the logic for userChoice == "send"
		and userChoice == "quit" therefore. They will be ignored

		"""
	# Place your logic here elif userChoice == "send": # Place your logic here elif userChoice
	== "quit":
		print( "Goodbye" )
	else :
		print( "Oops - incorrect input" )