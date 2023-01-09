import { token, tokenizer, TokenTypes } from "./tokenizer";

export enum NodeTypes {
	root,
	number,
	callExpression
}

type ChildNode = numberNode | CallExpressionNode

interface Node {
	type: NodeTypes,
}

interface rootNode extends Node {
	body: ChildNode[]
}

interface CallExpressionNode extends Node {
	name: string,
	parms: ChildNode[]
}

interface numberNode extends Node {
	value: string
}


export const createRootNode = (): rootNode => {
	return {
		type: NodeTypes.root,
		body: []
	}
}

export const createNumberNode = (value: string): numberNode => {
	return {
		type: NodeTypes.number,
		value
	}
}

const createCallExpressionNode = (name: string): CallExpressionNode => {
	return {
		type: NodeTypes.callExpression,
		name,
		parms: []
	}
}

export const parser = (tokens: token[]) => {
	let current = 0

	const rootNode = createRootNode()


	function walk() {
		let token = tokens[current]
		if (token.type === TokenTypes.Number) {
			current++
			return createNumberNode(token.value)
		}

		if (token.type === TokenTypes.Paren && token.value === "(") {
			//更新指针
			token = tokens[++current]
			const node: CallExpressionNode = createCallExpressionNode(token.value)
			token = tokens[++current]
			while (!(token.type === TokenTypes.Paren && token.value === ")")) {
				if (token.type === TokenTypes.Number) {
					node.parms.push(walk())
					token = tokens[current]
				}
				current++
				return node
			}
		}
		throw new Error(`不认识的token!${token}`)
	}
	rootNode.body.push(walk())
	return rootNode
}