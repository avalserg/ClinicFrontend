import { PluginItem } from "@babel/core";
// for remove attributes with production build as example data-testid
export default function (): PluginItem {
  return {
    visitor: {
      Program(path, state) {
        const forbidden = state.opts.props || [];
        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name;
            if (forbidden.includes(nodeName)) {
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}
