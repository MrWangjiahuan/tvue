;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['form'],
  {
    '054c': function(t, e, r) {
      'use strict'
      r.r(e)
      var a = function() {
          var t = this,
            e = t.$createElement,
            r = t._self._c || e
          return r('div', [r('router-view')], 1)
        },
        o = [],
        n = r('9ab4'),
        l = r('60a3'),
        i = (function(t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this
          }
          return n['c'](e, t), (e = n['b']([l['a']], e)), e
        })(l['e']),
        u = i,
        c = u,
        s = r('2877'),
        f = Object(s['a'])(c, a, o, !1, null, '1d972c67', null)
      e['default'] = f.exports
    },
    '31f42': function(t, e, r) {
      'use strict'
      r.r(e)
      var a = function() {
          var t = this,
            e = t.$createElement,
            r = t._self._c || e
          return r('div')
        },
        o = [],
        n = r('9ab4'),
        l = r('60a3'),
        i = (function(t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this
          }
          return n['c'](e, t), (e = n['b']([l['a']], e)), e
        })(l['e']),
        u = i,
        c = u,
        s = r('2877'),
        f = Object(s['a'])(c, a, o, !1, null, '30c8086a', null)
      e['default'] = f.exports
    },
    '7c5c': function(t, e, r) {
      'use strict'
      r.r(e)
      var a = function() {
          var t = this,
            e = t.$createElement,
            r = t._self._c || e
          return r(
            'div',
            [
              r(
                'a-form',
                { attrs: { layout: t.formLayout, form: t.form } },
                [
                  r(
                    'a-form-item',
                    {
                      attrs: {
                        label: 'Form Layout',
                        'label-col': t.formItemLayout.labelCol,
                        'wrapper-col': t.formItemLayout.wrapperCol
                      }
                    },
                    [
                      r(
                        'a-radio-group',
                        {
                          attrs: { 'default-value': 'horizontal' },
                          on: { change: t.handleFormLayoutChange }
                        },
                        [
                          r(
                            'a-radio-button',
                            { attrs: { value: 'horizontal' } },
                            [t._v('Horizontal')]
                          ),
                          r(
                            'a-radio-button',
                            { attrs: { value: 'vertical' } },
                            [t._v('Vertical')]
                          ),
                          r('a-radio-button', { attrs: { value: 'inline' } }, [
                            t._v('Inline')
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  r(
                    'a-form-item',
                    {
                      attrs: {
                        label: 'Field A',
                        'label-col': t.formItemLayout.labelCol,
                        'wrapper-col': t.formItemLayout.wrapperCol
                      }
                    },
                    [
                      r('a-input', {
                        directives: [
                          {
                            name: 'decorator',
                            rawName: 'v-decorator',
                            value: [
                              'fieldA',
                              {
                                initialValue: t.fieldA,
                                rules: [
                                  {
                                    required: !0,
                                    min: 6,
                                    message: '必须大于5个字符'
                                  }
                                ]
                              }
                            ],
                            expression:
                              "[\n          'fieldA',\n          {\n            initialValue: fieldA,\n            rules: [{ required: true, min: 6, message: '必须大于5个字符' }]\n          }\n        ]"
                          }
                        ],
                        attrs: { placeholder: 'input placeholder' }
                      })
                    ],
                    1
                  ),
                  r(
                    'a-form-item',
                    {
                      attrs: {
                        label: 'Field B',
                        'label-col': t.formItemLayout.labelCol,
                        'wrapper-col': t.formItemLayout.wrapperCol
                      }
                    },
                    [
                      r('a-input', {
                        directives: [
                          {
                            name: 'decorator',
                            rawName: 'v-decorator',
                            value: ['fieldB'],
                            expression: "['fieldB']"
                          }
                        ],
                        attrs: { placeholder: 'input placeholder' }
                      })
                    ],
                    1
                  ),
                  r(
                    'a-form-item',
                    { attrs: { 'wrapper-col': t.buttonItemLayout.wrapperCol } },
                    [
                      r(
                        'a-button',
                        {
                          attrs: { type: 'primary' },
                          on: { click: t.handleSubmit }
                        },
                        [t._v('Submit')]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        },
        o = [],
        n = r('9ab4'),
        l = r('60a3'),
        i = (function(t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this
            return (
              (e.formLayout = 'horizontal'),
              (e.fieldA = 'hello'),
              (e.fieldB = ''),
              e
            )
          }
          return (
            n['c'](e, t),
            (e.prototype.created = function() {
              this.form = this.$form.createForm(this)
            }),
            (e.prototype.mounted = function() {
              var t = this
              setTimeout(function() {
                t.form.setFieldsValue({ fieldA: 'hello word' })
              }, 3e3)
            }),
            Object.defineProperty(e.prototype, 'formItemLayout', {
              get: function() {
                var t = this.formLayout
                return 'horizontal' === t
                  ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
                  : {}
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, 'buttonItemLayout', {
              get: function() {
                var t = this.formLayout
                return 'horizontal' === t
                  ? { wrapperCol: { span: 14, offset: 4 } }
                  : {}
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.handleFormLayoutChange = function(t) {
              this.formLayout = t.target.value
            }),
            (e.prototype.handleSubmit = function() {
              var t = this
              this.form.validateFields(function(e, r) {
                e || (console.log(r), Object.assign(t, r))
              })
            }),
            (e = n['b']([l['a']], e)),
            e
          )
        })(l['e']),
        u = i,
        c = u,
        s = r('2877'),
        f = Object(s['a'])(c, a, o, !1, null, '3c49b023', null)
      e['default'] = f.exports
    },
    c4f4: function(t, e, r) {
      'use strict'
      r.r(e)
      var a = function() {
          var t = this,
            e = t.$createElement,
            r = t._self._c || e
          return r('div')
        },
        o = [],
        n = r('9ab4'),
        l = r('60a3'),
        i = (function(t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this
          }
          return n['c'](e, t), (e = n['b']([l['a']], e)), e
        })(l['e']),
        u = i,
        c = u,
        s = r('2877'),
        f = Object(s['a'])(c, a, o, !1, null, '107d2d0a', null)
      e['default'] = f.exports
    },
    e55c: function(t, e, r) {
      'use strict'
      r.r(e)
      var a = function() {
          var t = this,
            e = t.$createElement,
            r = t._self._c || e
          return r('div')
        },
        o = [],
        n = r('9ab4'),
        l = r('60a3'),
        i = (function(t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this
          }
          return n['c'](e, t), (e = n['b']([l['a']], e)), e
        })(l['e']),
        u = i,
        c = u,
        s = r('2877'),
        f = Object(s['a'])(c, a, o, !1, null, '1f9b5cac', null)
      e['default'] = f.exports
    }
  }
])
//# sourceMappingURL=form.9c65f3b4.js.map
