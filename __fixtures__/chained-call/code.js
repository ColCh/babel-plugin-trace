function SumChain () {
    var sum = 0;

    var obj = {
        add: function (num) {
            sum += num;
            return self;
        },
        getSum: function () {
            return sum;
        }
    };

    var self = obj;

    return obj;
}

// expect to be 4
SumChain().add(1).add(1).add(1).add(1).getSum();