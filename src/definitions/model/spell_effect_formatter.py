class SpellEffectFormatter(object):
    def __init__(self):
        pass

    def format(self, effects):
        def add_indent():
            nonlocal result, current_indent
            result += "<ul>"
            current_indent += 1

        def remove_indent():
            nonlocal result, current_indent
            result += "</ul>"
            current_indent -= 1
        
        result = ""
        current_indent = -1
            
        for effect in effects:
            indentation = effect["indentation"]
            if indentation > current_indent:
                add_indent()
            elif indentation < current_indent:
                remove_indent()

            result += "<li>" + effect["description"] + "</li>"


        while current_indent >= 0:
            remove_indent()

        return result
