lista_ingles = 'day, night, afternoon, morning, together, theirs, theirs, his, hers, he, her, them, them, me, my, with, where, how much, I want, we want, how much?, seriously, parents, brother , sister, grandmother, grandfather, aunt, cousin, cousin, uncle, good, bad, terrible, horrible, reading, reading, writing, writing, running, running, playing, playing'
lista_pt = 'dia, noite, tarde, manhã, juntos, deles, deles, dele, dela, ele, ela, eles, eles, eu, meu, com, onde, quanto, eu quero, nós queremos, quanto?, sério, pais, irmão, irmã, avó, avô, tia, primo, primo, tio, bom, ruim, terrível, horrível, lendo, lendo, escrevendo, escrevendo, correndo, correndo, brincando, brincando'

def arrumando(l1,l2):
    lista_ingles = l1.split(',')
    lista_pt = l2.split(',')
    dicionario = {chave: valor for chave, valor in zip(lista_ingles, lista_pt)}
arrumando(lista_ingles,lista_pt)