from urllib.request import Request


'''
api wrapper class
icon storage class


foreach class
http://data.soe.com/xml/get/eq2/constants/?c:show=adventureclass_list
fill lineage

    foreach tree in class
        foreach aa in tree
            http://data.soe.com/xml/get/eq2/alternateadvancement/76
             
            http://data.soe.com/xml/get/eq2/spell/?c:limit=10&crc=3302918945
            prereq, rank, location, icon info
            
            http://data.soe.com/img/eq2/icons/166/achievement
            
            foreach rank in aa
                fill effect description and indentation
'''
class SonyDataProvider:
    def __init__(self, http):
        self._http = http
    
    def classes(self):
        pass
    
    def tree(self, tree_id):
        pass
    
    def aa(self, aa_id):
        pass
    
    def spells(self, spell_crc):
        pass