#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif 

#ifdef __cplusplus
#define EXTERN extern "C"
#else 
#define EXTERN
#endif

double* indexMatrix(double* matrix, int N, int row, int column) {
	return &matrix[row * N + column];
}

double readMatrix(double* matrix, int N, int row, int column) {
	return *indexMatrix(matrix, N, row, column);
}

void writeMatrix(double* matrix, int N, int row, int column, double value) {
	*indexMatrix(matrix, N, row, column) = value;
}

double determinant(double* matrix, int N) {
	// Base case: 2x2 Matrix
	if (N == 2) {
		return readMatrix(matrix, N, 0, 0) * readMatrix(matrix, N, 1, 1)
			- readMatrix(matrix, N, 0, 1) * readMatrix(matrix, N, 1, 0);
	}

	int subN = N - 1;
	double* submatrix = malloc(subN * subN * sizeof(double));

	// Copy first submatrix

	for (int row = 0; row < subN; row++) {
		memcpy(
			indexMatrix(submatrix, subN, row, 0),
			indexMatrix(matrix, N, row + 1, 1),
			subN * sizeof(double)
		);
	}

	// For every column

	double result = 0;
	double sign = 1.0; // to control (-1)^k
	for (int i = 0; i < N; i++) {
		// Find and reduce subDeterminant to result
		double subDeterminant = determinant(submatrix, subN);
		double coefficient = readMatrix(matrix, N, 0, i);
		result += sign * coefficient * subDeterminant;

		sign = -sign;

		// Prepare submatrix for next iteration:
		// copy column i
		for (int row = 0; row < subN; row++) {
			double value = readMatrix(matrix, N, row + 1, i);
			writeMatrix(submatrix, subN, row, i, value);
		}
	}

	free(submatrix);
	return result;
}

EXTERN EMSCRIPTEN_KEEPALIVE bool solve(
	double* coefficientMatrix, double* constants, int N, double* solution
) {
	if (N < 2)
		return false;

	double coefficientDeterminant = determinant(coefficientMatrix, N);
	double* matrixCopy = malloc(N * N * sizeof(double));

	memcpy(matrixCopy, coefficientMatrix, N * N * sizeof(double));

	// For every column

	for (int i = 0; i < N; i++) {
		// Copy constants to column i of matrixCopy
		for (int row = 0; row < N; row++) {
			writeMatrix(matrixCopy, N, row, i, constants[row]);
		}

		// Get solution
		solution[i] = determinant(matrixCopy, N) / coefficientDeterminant;

		// Restore matrixCopy
		for (int row = 0; row < N; row++) {
			int value = readMatrix(coefficientMatrix, N, row, i);
			writeMatrix(matrixCopy, N, row, i, value);
		}
	}

	return true;
}

EXTERN EMSCRIPTEN_KEEPALIVE int ping() {
	printf("Pong!\n");
	return 1337;
}

#define SIZE 3

EXTERN EMSCRIPTEN_KEEPALIVE int main() {
#if __EMSCRIPTEN__

	double coefficients[SIZE][SIZE] = {
		{ 1.0, 1.0, -1.0 },
		{ 1.0, 0.0, 1.0 },
		{ 2.0, -1.0, 0.0 }
	};
	double constants[SIZE] = {
		0.0,
		5.0,
		0.0
	};

	double solution[SIZE] = {};

	solve((double*)coefficients, constants, SIZE, solution);

	printf(
		"x = %.2f\n"
		"y = %.2f\n"
		"z = %.2f\n",
		solution[0],
		solution[1],
		solution[2]
	);
#endif

	return 0;
}