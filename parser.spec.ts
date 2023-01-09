import { expect, test } from "vitest";
import { NodeTypes, parser } from "./parser";
import { TokenTypes } from "./tokenizer";

test.skip("parser", () => {
    const ast = {
        type: 'Program',
        body: [{
            type: 'CallExpression',
            name: 'add',
            params: [{
                type: 'NumberLiteral',
                value: '2'
            }, {
                type: 'CallExpression',
                name: 'subtract',
                params: [{
                    type: 'NumberLiteral',
                    value: '4'
                }, {
                    type: 'NumberLiteral',
                    value: '2'
                }]
            }]
        }]
    };
})

test("Number", () => {
    const tokens = [
        {
            type: TokenTypes.Number, value: "2"
        },
    ]

    const ast = {
        type: NodeTypes.root,
        body: [
            {
                type: NodeTypes.number,
                value: "2"
            }
        ]
    }
    expect(parser(tokens)).toEqual(ast)
})

test("callExpression", () => {
    const tokens = [
        { type: TokenTypes.Paren, value: '(' },
        { type: TokenTypes.Name, value: 'add' },
        { type: TokenTypes.Number, value: '2' },
        { type: TokenTypes.Number, value: '4' },
        { type: TokenTypes.Paren, value: ')' },

    ]

    const ast = {
        type: NodeTypes.root,
        body: [{
            type: NodeTypes.callExpression,
            name: 'add',
            params: [{
                type: NodeTypes.number,
                value: '2'
            }, {
                type: NodeTypes.number,
                value: '4'
            },
            ]
        }]
    };
})