export const recommendation = async (expenses, budget) => {
    const n = expenses.length;
    const dp = Array.from({ length: n + 1 }, () => Array(budget + 1).fill(0));
    const result = [];

    for (let i = 1; i <= n; i++) {
        const { value, price } = expenses[i - 1];
        for (let j = 0; j <= budget; j++) {
            if (price <= j) {
                dp[i][j] = Math.max(dp[i - 1][j], value + dp[i - 1][j - price]);
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    let i = n;
    let j = budget;

    while (i > 0 && j > 0) {
        if (dp[i][j] !== dp[i - 1][j]) {
            result.push(expenses[i - 1]);
            j -= expenses[i - 1].price;
        }
        i--;
    }

    console.log(result)
    return { max_value: dp[n][budget], result: result };
};  
