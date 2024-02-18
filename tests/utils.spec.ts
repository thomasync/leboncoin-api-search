import { levenshteinDistance, simpleText } from '../src/utils';

describe('Utils', () => {
	describe('levenshteinDistance', () => {
		it('should return 0 if strings are equals', () => {
			const distance = levenshteinDistance('test', 'test');
			expect(distance).toEqual(0);
		});

		it('should return 1 if strings have one character different', () => {
			const distance = levenshteinDistance('test', 'tost');
			expect(distance).toEqual(1);
		});

		it('should return 1 if strings have one character added', () => {
			const distance = levenshteinDistance('test', 'tests');
			expect(distance).toEqual(1);
		});

		it('should return 1 if strings have one character removed', () => {
			const distance = levenshteinDistance('tests', 'test');
			expect(distance).toEqual(1);
		});

		it('should return 4 if strings are completely different', () => {
			const distance = levenshteinDistance('test', 'abcd');
			expect(distance).toEqual(4);
		});
	});

	describe('simpleText', () => {
		it('should return text without accents and in lower case', () => {
			const text = 'éàçù';
			const simple = simpleText(text);
			expect(simple).toEqual('eacu');
		});

		it('should return text without special characters', () => {
			const text = 'éàçù!@#$%^&*()_+';
			const simple = simpleText(text);
			expect(simple).toEqual('eacu');
		});

		it('should return text without accents, in lower case and without special characters', () => {
			const text = 'éàçù!@# -$%^&*()_+';
			const simple = simpleText(text);
			expect(simple).toEqual('eacu');
		});
	});
});
