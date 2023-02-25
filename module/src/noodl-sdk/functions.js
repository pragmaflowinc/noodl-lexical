import { createNodeDefinition } from './internal/node';

/**
 * Create a new logic node.
 *
 * @param def 
 * @returns 
 */
export function defineNode(def) {
    const internalDefinition = createNodeDefinition(def)

    return {
        node: internalDefinition,
        setup: def.setup
    };
}

/**
 * 
 * @param def 
 * @returns 
 */
export function defineCollectionNode(def) {
    const _def = {
        name: def.name,
        category: def.category,
        color: 'data',
        inputs: def.inputs,
        outputs: Object.assign({
            Items: 'array',
            'Fetch Started': 'signal',
            'Fetch Completed': 'signal'
        }, def.outputs || {}),
        signals: Object.assign({
            Fetch: function () {
                var _this = this;
                this.sendSignalOnOutput('Fetch Started');
                var a = def.fetch.call(this, function () {
                    _this.sendSignalOnOutput('Fetch Completed');
                });
                this.setOutputs({
                    Items: a
                })
            }
        }, def.signals || {})
    }

    return defineNode(_def);
}

/**
 * 
 * @param def 
 * @returns 
 */
export function defineModelNode(def) {
    const _def = {
        name: def.name,
        category: def.category,
        color: 'data',
        inputs: {
            Id: 'string'
        },
        outputs: {
            Fetched: 'signal'
        },
        changed: {
            Id: function (value) {
                if (this._object && this._changeListener)
                    this._object.off('change', this._changeListener)

                this._object = Noodl.Object.get(value);
                this._changeListener = (name, value) => {
                    const _o = {}
                    _o[name] = value;
                    this.setOutputs(_o)
                }
                this._object.on('change', this._changeListener)

                this.setOutputs(this._object.data);
                this.sendSignalOnOutput('Fetched');
            }
        },
        initialize: function () {

        }
    }

    for (var key in def.properties) {
        _def.inputs[key] = def.properties[key];
        _def.outputs[key] = def.properties[key];
        _def.changed[key] = (function () {
            const _key = key; return function (value) {
                if (!this._object) return;
                this._object.set(_key, value);
            }
        })()
    }

    // @ts-expect-error
    return defineNode(_def);
}

/**
 * Create a new React node.
 *
 * @param def 
 * @returns 
 */
export function defineReactNode(def) {
    const internalDefinition = createNodeDefinition(def);
    internalDefinition.getReactComponent = def.getReactComponent;
    internalDefinition.inputProps = def.inputProps;
    internalDefinition.inputCss = def.inputCss;
    internalDefinition.outputProps = def.outputProps;
    internalDefinition.setup = def.setup;
    internalDefinition.frame = def.frame;

    return internalDefinition;
}

export function defineModule(def) {
    // HACK: Making webpack think that the method is in here. 
    return Noodl.defineModule(def);
}

export function getProjectSettings() {
    // HACK: Making webpack think that the method is in here. 
    return Noodl.getProjectSettings();
}

export function runDeployed() {
    // HACK: Making webpack think that the method is in here. 
    return Noodl.runDeployed;
}
