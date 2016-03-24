import re

class SmartCutter(object):

	def cut_at_last_space(self, message):
		reverse_message = message[::-1]
		counter = 0
		for letter in reverse_message:
			counter += 1
			if letter == " ":
				return message[:-counter - 1], counter
		return message, 0

	def smart_cut(self, text):
		if not text or not (len(text) > 0):
			return "", 0
		if text[-1] == " ":
			return text, 0
		return self.cut_at_last_space(text)

	def split_on_space(self, message):
		MAX_CHARACTERS= 48
		result = []
		message = re.sub(' +',' ', message).replace('\n', '').replace('#', 'no.')    
		current_start_position = 0
		while len(message[current_start_position:]) > MAX_CHARACTERS:
			line_to_add = message[current_start_position:current_start_position + MAX_CHARACTERS]
			line_to_add, characters_before = self.smart_cut(line_to_add)
			result += [line_to_add]
			current_start_position += (MAX_CHARACTERS - characters_before)

		result += [message[current_start_position:]]
		
		return result