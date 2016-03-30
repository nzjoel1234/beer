var underTest = require('./objectIdHelper');

function test (id) {
    var result = underTest.toObjectId(id);
    console.log(id + ': ' + result);
}

test('');
test(123456789012);
test('123456789012');
test('AAA456789012');
test('XXX456789012');
test('123456789012123456789012');
test('AAA456789012123456789012');
test('aaa456789012123456789012');
test('XXX456789012123456789012');

test(underTest.toObjectId('123456789012123456789012'));
